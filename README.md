# Work in Progress

This project is in progress. More details will be added as the work continues.

```json
{
  "name": "Cafe Aroma",
  "cuisine": "Continental",
  "location": "MG Road",
  "rating": 4.1
}
```

### PUT `/api/restaurants/:id`

Request body (same as POST):

```json
{
  "name": "Cafe Aroma Updated",
  "cuisine": "Italian",
  "location": "MG Road",
  "rating": 4.4
}
```

### DELETE `/api/restaurants/:id`

Response:

- HTTP 204 No Content

---

## 5) Setup and Run

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Run both frontend and backend together

```bash
npm run dev
```

Services:

- Frontend: Parcel dev server (typically `http://localhost:1234`)
- Backend: `http://localhost:5001`

### Run services separately

```bash
npm run backend
npm run start
```

---

## 6) Scripts

From `package.json`:

- `npm run start` : starts frontend (Parcel)
- `npm run backend` : starts backend API server
- `npm run dev` : runs frontend + backend concurrently
- `npm test` : runs Jest

---

## 7) Validation Checklist

Use this checklist after running app:

- Add a restaurant and confirm card appears
- Edit a restaurant and confirm updated values persist
- Refresh browser and confirm edited values remain
- Delete a restaurant and confirm removal
- Search by name/cuisine/location and verify filtering

---

## 8) Future Improvements

- Add pagination for large records
- Add server-side search/filtering
- Add authentication and role-based access
- Replace JSON DB with PostgreSQL or MongoDB
- Add automated API and UI tests

---

## 9) Summary

You now have a non-Docker full-stack app where:

- Frontend handles user interactions
- Backend provides validated CRUD APIs
- Integration is complete and reliable
- Database persists edit updates correctly

The edit-not-saving issue is fixed through proper update flow and persistent backend storage.
