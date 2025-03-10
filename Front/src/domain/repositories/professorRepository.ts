import publicApiClient from '../../infrastructure/api/client/publicClient';

export const searchProfessorByName = async (name: string) => {
    try {
        const response = await publicApiClient.get(`/professors/search/${name}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un problema al obtener el profesor")
    }
};

export const getProfessorById = async (id: string) => {
    try {
        const response = await publicApiClient.get(`/professors/getById/${id}`);
        console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un problema al obtener el profesor")
    }
};

export const getProfessors = async () => {
    try {
        const response = await publicApiClient.get(`/professors/getAll`);
        console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un problema al obtener todos los profesores")
    }
};

export const deleteProfessor = async (id: string) => {
    try {
        const response = await publicApiClient.delete(`/professors/delete/${id}`);
        console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un problema al eliminar el profesor")
    }
};

export const updateProfessor = async (id: string) => {
    try {
        const response = await publicApiClient.put(`/professors/put/${id}`);
        console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un problema al actualizar el profesor")
    }
};



export const createProfessor = async (professorData) => {
    try {
        console.log(professorData);
        const response = await publicApiClient.post(`/professors/create`, professorData, {
            headers: { "Content-Type": "application/json" },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un problema al crear el profesor")
    }
};



// voy a meter aqui el repository de get courses porque lo ocupo para hacer pruebas
// HAY QUE CAMBIARLO!!!!

export const getCourses = async () => {
    try {
        const response = await publicApiClient.get(`/courses`);
        console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un problema al obtener todos los cursos")
    }
};


