from __future__ import annotations

import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / 'data' / 'shockwaves_snapshot.json'

app = FastAPI(title='Shockwaves API', version='1.0.0')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

with DATA_FILE.open('r', encoding='utf-8') as f:
    SHOCKWAVES_DATA = json.load(f)


@app.get('/api/health')
def health() -> dict:
    return {'status': 'ok', 'message': 'Shockwaves data API is online.'}


@app.get('/api/summary')
def summary() -> dict:
    return {
        'retrieved_at': SHOCKWAVES_DATA['retrieved_at'],
        'snapshot_label': SHOCKWAVES_DATA['snapshot_label'],
        'headline_metrics': SHOCKWAVES_DATA['headline_metrics'],
    }


@app.get('/api/sources')
def sources() -> dict:
    return {'sources': SHOCKWAVES_DATA['sources']}


@app.get('/api/series')
def series() -> dict:
    return {'series': SHOCKWAVES_DATA['series']}
