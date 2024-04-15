/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react'
import { sp } from '@pnp/sp/presets/all'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface IManageMedicineData {
    Id: number;
    Title: string; // Update the type of MedicineName
    Age: number; // Update the type of Description
    ClassId: any

}
console.log('sp55', sp);


sp.setup({
    sp: {
        baseUrl: 'https://5n1t6f.sharepoint.com/sites/CrudOperationsInPnPByPrem'
    }
})

const GetData = () => {
    const [manageMedicineData, setManageMedicineData] = React.useState<IManageMedicineData[]>([]);
    const [newData, setNewData] = React.useState({
        Id: 0,
        Title: '',
        Age: 0
    })
    const [isEditing, setIsEditing] = React.useState(false)

    const getStudentDataFromList = async () => {
        try {
            //const data = await sp.web.lists.getByTitle('StudentDetails').items.getAll()
            const data = await sp.web.lists.getByTitle('StudentDetails').items
                .select("Class/ID", "Class/Title", "Age", "Id", "Title").expand("Class").getAll();


            console.log('data', data);
            setManageMedicineData(data)

        }
        catch {
            throw new Error('values are not getting')
            // console.log("error");

        }
    }

    // const getStudentDataFromList = async () => {
    //     try {

    //         const data = await sp.web.lists.getByTitle('StudentDetails').items


    //             .select("Age", "Id", "Title")

    //             .getAll();

    //         console.log('data666', data);
    //         setManageMedicineData(data);
    //     } catch (error) {
    //         console.error('Error fetching student data:', error);
    //         // Handle error gracefully
    //     }
    // }

    React.useEffect(() => {
        getStudentDataFromList()
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (isEditing) {
                await sp.web.lists.getByTitle('StudentDetails').items.getById(newData.Id).update(newData)

            }
            else {
                await sp.web.lists.getByTitle('StudentDetails').items.add(newData)

            }
            getStudentDataFromList()
            setNewData({
                Id: 0,
                Title: '',
                Age: 0
            })

        }
        catch {
            throw new Error('item is failed to add or update')
        }
    }



    // const handleInputChange = (e: any) => {
    //     const { name, value } = e.target;
    //     setNewData({ ...newData, [name]: value })
    // }

    // const handleInputChange = (e: any) => {
    //     const { name, value } = e.target;
    //     setNewData({ ...newData, [name]: value })
    // }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value })
    }

    const handleEdit = (item: any) => {
        setNewData(item)
        setIsEditing(true)
    }

    const handleDelete = async (ItemId: number) => {
        try {
            await sp.web.lists.getByTitle('StudentDetails').items.getById(ItemId).delete()
            getStudentDataFromList()
        }
        catch {
            throw new Error('Item is not deleted')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type='string'
                    placeholder='Enter Student Name'
                    name="Title"
                    value={newData.Title}
                    onChange={handleInputChange}
                />

                <input
                    type="number"
                    placeholder='Enter Age'
                    name='Age'
                    value={newData.Age}
                    onChange={handleInputChange}
                />
                <button type='submit'>{isEditing ? 'Update' : 'Add'}</button>
            </form>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Class</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {manageMedicineData.map((item: IManageMedicineData, index: number) => (
                        <tr key={item.Id}>
                            <td>{index + 1}</td>
                            <td>{item.Title}</td>
                            <td>{item.Age}</td>
                            <td>{item.ClassId}</td>
                            <td className='text-primary' onClick={() => handleEdit(item)}><FaRegEdit /></td>
                            <td className='text-danger' onClick={() => handleDelete(item.Id)}><MdDelete /></td>


                        </tr>
                    ))}
                </tbody>
            </table>
            <h1>GetData</h1>
        </>
    )
}
export default GetData