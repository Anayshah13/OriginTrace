from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool
from get_data import get_supply_chain_data
import os

from fastapi import FastAPI, HTTPException, Query
from fastapi.concurrency import run_in_threadpool
from fastapi.middleware.cors import CORSMiddleware

if __package__:
    from .get_data import get_supply_chain_data
else:
    # Running as `uvicorn main:app` with cwd = backend/
    from get_data import get_supply_chain_data

app = FastAPI(
    title="Synergy Supply Chain API",
    description="Exposes supplier/recursive discovery data as a graph of nodes and edges.",
    version="1.1.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
def read_root():
    return {"message": "Synergy Supply Chain API is running. Use /company/{name} to explore."}


@app.get("/test")
def test():
    """Quick connectivity test with a shallow tier."""
    try:
        return get_supply_chain_data("Apple", depth=1, limit=1)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/company/{name}")
async def get_company_graph(
    name: str,
    depth: int = Query(3, ge=0, le=8),
    max_tier: int | None = Query(None, ge=0, le=8),
    limit: int = Query(3, ge=1, le=20),
    anchor_hsn: str | None = Query(None),
):
    """
    Builds and returns a supply chain graph for the specified company.
    - name: Company name to search (e.g., 'Apple')
    - depth: Legacy compatibility parameter for traversal depth
    - max_tier: Preferred tier cap (overrides depth when provided)
    - limit: Max suppliers to follow per layer
    - anchor_hsn: Optional user-selected HSN anchor
    """
    try:
        effective_max_tier = max_tier if max_tier is not None else depth
        data = await run_in_threadpool(
            get_supply_chain_data,
            name,
            depth,
            limit,
            anchor_hsn,
            effective_max_tier,
        )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    # Allow port to be set by environment variable for deployment flexibility
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
