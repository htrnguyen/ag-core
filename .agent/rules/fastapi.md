## FastAPI Standard

### Router Structure

- **APIRouter**: Use `APIRouter` with exclusive `prefix` and `tags`.
- **Organization**: One router per domain/feature.
- **Logic**: NO business logic in routers. Delegate to Services.

### Dependency Injection

- **Scope**: Use `Depends()` for DB sessions, Config, and Auth.
- **Global**: Avoid global state.

### Data Validation

- **Pydantic**: Strict Request/Response models (DTOs).
- **Descriptions**: All fields must have `description=...` and `examples`.
- **Type Hints**: 100% Type Annotated.

### Async & Concurrency

- **I/O**: Use `async def` for DB, HTTP, and File operations.
- **Blocking**: Wrap blocking calls in `run_in_threadpool`.

### Azure Integration

- **SDK**: Use official Azure SDKs (Search, Blob, Queue).
- **Auth**: Use `DefaultAzureCredential` preferentially.
