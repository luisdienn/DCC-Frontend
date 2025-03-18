import publicApiClient from "@/infrastructure/api/client/publicClient";

export const getUserByEmail = async (email: string) => {
  try {
    const response = await publicApiClient.get(`/users/me`, {
      params: { email },
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw new Error("Hubo un problema al obtener el usuario");
  }
};
