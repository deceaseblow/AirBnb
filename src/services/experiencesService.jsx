import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

/* ========= GET ========= */
async function getExperiencesTbilisi() {
    try {
        const res = await axios.get(`${BASE_URL}/experiencesTbilisi`)
        return res.data;
    } catch (error) {
        console.error("Error fetching Tbilisi experiences:", error)
        throw error;
    }
}
async function getExperiencesRome() {
    try {
        const res = await axios.get(`${BASE_URL}/experiencesRome`)
        return res.data;
    } catch (error) {
        console.error("Error fetching Rome experiences:", error)
        throw error;
    }
}
async function getExperiencesFatih() {
    try {
        const res = await axios.get(`${BASE_URL}/experiencesFatih`)
        return res.data;
    } catch (error) {
        console.error("Error fetching Fatih experiences:", error)
        throw error;
    }
}

/* ========= CREATE ========= */
async function addExperienceTbilisi(data) {
    return (await axios.post(`${BASE_URL}/experiencesTbilisi`, data)).data;
}
async function addExperienceRome(data) {
    return (await axios.post(`${BASE_URL}/experiencesRome`, data)).data;
}
async function addExperienceFatih(data) {
    return (await axios.post(`${BASE_URL}/experiencesFatih`, data)).data;
}

/* ========= UPDATE ========= */
async function updateExperienceTbilisi(id, data) {
    return (await axios.put(`${BASE_URL}/experiencesTbilisi/${id}`, data)).data;
}
async function updateExperienceRome(id, data) {
    return (await axios.put(`${BASE_URL}/experiencesRome/${id}`, data)).data;
}
async function updateExperienceFatih(id, data) {
    return (await axios.put(`${BASE_URL}/experiencesFatih/${id}`, data)).data;
}

/* ========= DELETE ========= */
async function deleteExperienceTbilisi(id) {
    return (await axios.delete(`${BASE_URL}/experiencesTbilisi/${id}`)).data;
}
async function deleteExperienceRome(id) {
    return (await axios.delete(`${BASE_URL}/experiencesRome/${id}`)).data;
}
async function deleteExperienceFatih(id) {
    return (await axios.delete(`${BASE_URL}/experiencesFatih/${id}`)).data;
}

export {
    getExperiencesTbilisi,
    getExperiencesRome,
    getExperiencesFatih,

    addExperienceTbilisi,
    addExperienceRome,
    addExperienceFatih,

    updateExperienceTbilisi,
    updateExperienceRome,
    updateExperienceFatih,

    deleteExperienceTbilisi,
    deleteExperienceRome,
    deleteExperienceFatih
}
