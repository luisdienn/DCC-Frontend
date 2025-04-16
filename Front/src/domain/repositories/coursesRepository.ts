import publicApiClient from "../../infrastructure/api/client/publicClient";

export const getCourses = async () => {
  try {
    const response = await publicApiClient.get(`/courses/getAll`);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Hubo un problema al obtener todas las materias");
  }
};

export const getCourseById = async (id: string) => {
  try {
    const response = await publicApiClient.get(`/courses/getById/${id}`);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Hubo un problema al obtener la materia");
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const response = await publicApiClient.delete(`/courses/delete/${id}`);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Hubo un problema al eliminar la materia");
  }
};

export const createCourse = async (courseData) => {
  try {
    console.log(courseData);
    const response = await publicApiClient.post(`/courses/create`, courseData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Hubo un problema al crear la materia");
  }
};

export const updateMateria = async (id: string, nombre: string) => {
  try {
    console.log("Enviando PUT a API:", { id, nombre });

    const response = await publicApiClient.put(
      `/courses/update/${id}`,
      { id, nombre }, 
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un problema al actualizar la materia");
  }
};
