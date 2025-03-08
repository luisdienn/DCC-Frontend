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
        const response = await publicApiClient.get(`/professors/${id}`);
        console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un problema al obtener el profesor")
    }
};





// async def search_professors(self, name: str):
// return await self.repository.get_professors_by_name_or_lastname(name)



// #create

// async def create_professor(self, professor: ProfessorModel):
// return await self.repository.create_professor(professor)

// #read
// async def get_professor_by_id(self, professor_id: str):
// return await self.repository.get_professor_by_id(professor_id)

// async def get_professors(self):
// return await self.repository.get_all_professors() 


// #update

// async def update_professor(self, professor_id: str, professor: ProfessorModel):
// return await self.repository.update_professor(professor_id, professor)

// #delete
// async def delete_professor(self, professor_id: str):
// return await self.repository.delete_professor(professor_id)

