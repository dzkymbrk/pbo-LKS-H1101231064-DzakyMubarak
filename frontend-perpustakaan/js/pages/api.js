const Api = {
    async get(endpoint) {
        try {
            const r = await fetch(`${BASE_URL}${endpoint}`);
            return await r.json();
        } catch (e) {
            return { success: false, message: e.message };
        }
    },
    async post(endpoint, data) {
        try {
            const r = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await r.json();
        } catch (e) {
            return { success: false, message: e.message };
        }
    },
    async put(endpoint, data) {
        try {
            const r = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await r.json();
        } catch (e) {
            return { success: false, message: e.message };
        }
    },
    async delete(endpoint) {
        try {
            const r = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
            return await r.json();
        } catch (e) {
            return { success: false, message: e.message };
        }
    }
};