import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL 

async function getServicesPhoto() {
    try {
        const res = await axios.get(`${BASE_URL}/servicesPhoto`)
        return res.data;
    } catch (error) {
        console.error("Error fetching photo services:", error)
        throw error;
    }
}
async function getServicesChef(){
    try {
        const res = await axios.get(`${BASE_URL}/servicesChef`)
        return res.data;
    } catch (error) {
        console.error("Error fetching chef services:", error)
        throw error;
    }
}
async function getServicesMassage(){
    try {
        const res = await axios.get(`${BASE_URL}/servicesMassage`)
        return res.data;
    } catch (error) {
        console.error("Error fetching massage services:", error)
        throw error;
    }
}
async function getServicesParis(){
    try {
        const res = await axios.get(`${BASE_URL}/servicesParis`)
        return res.data;
    } catch (error) {
        console.error("Error fetching PARIS services:", error)
        throw error;
    }
}

async function addServicePhoto(data) {
    return (await axios.post(`${BASE_URL}/servicesPhoto`, data)).data;
}
async function addServiceChef(data) {
    return (await axios.post(`${BASE_URL}/servicesChef`, data)).data;
}
async function addServiceMassage(data) {
    return (await axios.post(`${BASE_URL}/servicesMassage`, data)).data;
}
async function addServiceParis(data) {
    return (await axios.post(`${BASE_URL}/servicesParis`, data)).data;
}

async function updateServicePhoto(id, data) {
    return (await axios.put(`${BASE_URL}/servicesPhoto/${id}`, data)).data;
}
async function updateServiceChef(id, data) {
    return (await axios.put(`${BASE_URL}/servicesChef/${id}`, data)).data;
}
async function updateServiceMassage(id, data) {
    return (await axios.put(`${BASE_URL}/servicesMassage/${id}`, data)).data;
}
async function updateServiceParis(id, data) {
    return (await axios.put(`${BASE_URL}/servicesParis/${id}`, data)).data;
}

async function deleteServicePhoto(id) {
    return (await axios.delete(`${BASE_URL}/servicesPhoto/${id}`)).data;
}
async function deleteServiceChef(id) {
    return (await axios.delete(`${BASE_URL}/servicesChef/${id}`)).data;
}
async function deleteServiceMassage(id) {
    return (await axios.delete(`${BASE_URL}/servicesMassage/${id}`)).data;
}
async function deleteServiceParis(id) {
    return (await axios.delete(`${BASE_URL}/servicesParis/${id}`)).data;
}

export {
    getServicesPhoto,
    getServicesChef,
    getServicesMassage,
    getServicesParis,

    addServicePhoto,
    addServiceChef,
    addServiceMassage,
    addServiceParis,

    updateServicePhoto,
    updateServiceChef,
    updateServiceMassage,
    updateServiceParis,

    deleteServicePhoto,
    deleteServiceChef,
    deleteServiceMassage,
    deleteServiceParis
}
        