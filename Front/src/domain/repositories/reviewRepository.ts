import publicApiClient from '../../infrastructure/api/client/publicClient';

export const createReview = async (review) => {
    try {
        const response = await publicApiClient.post(`/reviews/create`, review, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al enviar la reseña:", error.response?.data || error.message);
        throw new Error("Hubo un problema al enviar la reseña");
    }
};


export const getReviewsByProfessorId = async (id: string) => {
    try {
        const response = await publicApiClient.get(`/reviews/professor/${id}`);
        console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un problema al obtener las reseñas del profesor"); 
    }
};