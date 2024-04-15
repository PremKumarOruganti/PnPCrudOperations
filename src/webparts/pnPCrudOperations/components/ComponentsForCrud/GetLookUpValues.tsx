/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// import * as React from 'react'
// import { sp } from '@pnp/sp/presets/all'
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// interface IManageMedicineData {
//     Id: number;
//     Title: string;
//     Age: number;
//     Class: {
//         ID: number;
//         Title: string;
//     };
// }

// sp.setup({
//     sp: {
//         baseUrl: 'https://5n1t6f.sharepoint.com/sites/CrudOperationsInPnPByPrem'
//     }
// })

// const GetLookUpValues = () => {
//     const [manageMedicineData, setManageMedicineData] = React.useState<IManageMedicineData[]>([]);
//     const [newData, setNewData] = React.useState({
//         Id: 0,
//         Title: '',
//         Age: 0
//     })
//     const [isEditing, setIsEditing] = React.useState(false)

//     const getStudentDataFromList = async () => {
//         try {
//             const data = await sp.web.lists.getByTitle('StudentDetails').items
//                 .select("Class/ID", "Class/Title", "Age", "Id", "Title")
//                 .expand("Class")
//                 .getAll();
//             console.log('data', data);
//             setManageMedicineData(data)
//         } catch (error) {
//             throw new Error('values are not getting');
//         }
//     }

//     React.useEffect(() => {
//         getStudentDataFromList()
//     }, [])

//     const handleSubmit = async (e: any) => {
//         e.preventDefault()
//         try {
//             if (isEditing) {
//                 await sp.web.lists.getByTitle('StudentDetails').items.getById(newData.Id).update(newData)
//             } else {
//                 await sp.web.lists.getByTitle('StudentDetails').items.add(newData)
//             }
//             getStudentDataFromList()
//             setNewData({
//                 Id: 0,
//                 Title: '',
//                 Age: 0
//             })
//         } catch {
//             throw new Error('item is failed to add or update')
//         }
//     }

//     const handleInputChange = (e: any) => {
//         const { name, value } = e.target;
//         setNewData({ ...newData, [name]: value })
//     }

//     const handleEdit = (item: any) => {
//         setNewData(item)
//         setIsEditing(true)
//     }

//     const handleDelete = async (ItemId: number) => {
//         try {
//             await sp.web.lists.getByTitle('StudentDetails').items.getById(ItemId).delete()
//             getStudentDataFromList()
//         } catch {
//             throw new Error('Item is not deleted')
//         }
//     }

//     return (
//         <>
//             <h4>hello....</h4>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type='string'
//                     placeholder='Enter Student Name'
//                     name="Title"
//                     value={newData.Title}
//                     onChange={handleInputChange}
//                 />

//                 <input
//                     type="number"
//                     placeholder='Enter Age'
//                     name='Age'
//                     value={newData.Age}
//                     onChange={handleInputChange}
//                 />
//                 <button type='submit'>{isEditing ? 'Update' : 'Add'}</button>
//             </form>
//             <table className="table table-hover table-dark">
//                 <thead>
//                     <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">Student Name</th>
//                         <th scope="col">Age</th>
//                         <th scope="col">Class</th>
//                         <th scope="col">Edit</th>
//                         <th scope="col">Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {manageMedicineData.map((item: IManageMedicineData, index: number) => (
//                         <tr key={item.Id}>
//                             <td>{index + 1}</td>
//                             <td>{item.Title}</td>
//                             <td>{item.Age}</td>
//                             <td>{item.Class ? item.Class.Title : 'N/A'}</td> {/* Check if 'Class' is defined */}
//                             <td className='text-primary' onClick={() => handleEdit(item)}><FaRegEdit /></td>
//                             <td className='text-danger' onClick={() => handleDelete(item.Id)}><MdDelete /></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <h1>GetData</h1>
//         </>
//     )
// }
// export default GetLookUpValues;

import * as React from 'react';
import { sp } from '@pnp/sp/presets/all';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

interface IManageMedicineData {
    Id: number;
    Title: string;
    Age: number;
    Class: {
        ID: number;
        Title: string;
    };
}

interface IFormData {
    Id: number;
    Title: string;
    Age: number;
    ClassId: number; // Storing the ID of the selected class
}

const GetLookUpValues = () => {
    const [manageMedicineData, setManageMedicineData] = React.useState<IManageMedicineData[]>([]);
    const [formData, setFormData] = React.useState<IFormData>({
        Id: 0,
        Title: '',
        Age: 0,
        ClassId: 0,
    });
    const [isEditing, setIsEditing] = React.useState(false);

    const getStudentDataFromList = async () => {
        try {
            const data = await sp.web.lists.getByTitle('StudentDetails').items
                .select('Class/ID', 'Class/Title', 'Age', 'Id', 'Title', 'ClassId') // Include ClassId for lookup field
                .expand('Class')
                .getAll();
            setManageMedicineData(data);
        } catch (error) {
            throw new Error('Values are not getting');
        }
    };

    React.useEffect(() => {
        getStudentDataFromList();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { Id, Title, Age, ClassId } = formData;
            if (isEditing) {
                await sp.web.lists.getByTitle('StudentDetails').items.getById(Id).update({ Title, Age, ClassId });
            } else {
                await sp.web.lists.getByTitle('StudentDetails').items.add({ Title, Age, ClassId });
            }
            getStudentDataFromList();
            setFormData({ Id: 0, Title: '', Age: 0, ClassId: 0 });
        } catch (error) {
            throw new Error('Item failed to add or update');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEdit = (item: IManageMedicineData) => {
        const { Id, Title, Age, Class } = item;
        setFormData({ Id, Title, Age, ClassId: Class.ID }); // Set ClassId instead of Class object
        setIsEditing(true);
    };

    const handleDelete = async (ItemId: number) => {
        try {
            await sp.web.lists.getByTitle('StudentDetails').items.getById(ItemId).delete();
            getStudentDataFromList();
        } catch (error) {
            throw new Error('Item is not deleted');
        }
    };

    return (
        <>
            <h4>CRUD Operations for Lookup Values</h4>
            <form onSubmit={handleSubmit}>
                <input
                    type="string"
                    placeholder="Enter Student Name"
                    name="Title"
                    value={formData.Title}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    placeholder="Enter Age"
                    name="Age"
                    value={formData.Age}
                    onChange={handleInputChange}
                />
                <select
                    name="ClassId"
                    value={formData.ClassId}
                    onChange={handleInputChange}
                >
                    <option value={0}>Select Class</option>
                    {/* Render options for lookup values */}
                    {manageMedicineData.map(item => (
                        <option key={item.Class.ID} value={item.Class.ID}>{item.Class.Title}</option>
                    ))}
                </select>
                <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
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
                    {manageMedicineData.map((item, index) => (
                        <tr key={item.Id}>
                            <td>{index + 1}</td>
                            <td>{item.Title}</td>
                            <td>{item.Age}</td>
                            <td>{item.Class.Title}</td>
                            <td className="text-primary" onClick={() => handleEdit(item)}><FaRegEdit /></td>
                            <td className="text-danger" onClick={() => handleDelete(item.Id)}><MdDelete /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default GetLookUpValues;

