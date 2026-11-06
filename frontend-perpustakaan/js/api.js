const Api = {
       async get(endpoint) { const r = await fetch(`${BASE_URL}${endpoint}`); return r.json(); },
       async post(endpoint, data) {
           const r = await fetch(`${BASE_URL}${endpoint}`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
           return r.json();
       },
       async delete(endpoint) {
           const r = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
           return r.json();
       }
   };