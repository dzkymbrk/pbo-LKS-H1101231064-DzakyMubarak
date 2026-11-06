const Api = {
    async get(endpoint) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000); // Timeout 4 detik

            const response = await fetch(`${BASE_URL}${endpoint}`, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.error(`API Get Error [${endpoint}]:`, err);
            return { success: false, data: [], message: err.message };
        }
    },
    async post(endpoint, data) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (err) {
            console.error(`API Post Error [${endpoint}]:`, err);
            return { success: false, message: err.message };
        }
    },
    async delete(endpoint) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
            return await response.json();
        } catch (err) {
            console.error(`API Delete Error [${endpoint}]:`, err);
            return { success: false, message: err.message };
        }
    }
};