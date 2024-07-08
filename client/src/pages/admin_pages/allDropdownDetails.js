

import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { UseContext } from "../../storage/auth";
import { WebLoader } from "../../components/webLoader";
import { FaHome } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";

export const Dropdown = () => {
    const { getAllDD, DD, deleteDropdown, isLoading, filterdata } = UseContext();
    const [imgpreview, setImgpreview] = useState();
    const [updateDDImg, setUpdateDDImg] = useState(null);
    const [currentpid, setCurrentpid] = useState(null);

    const { tokenAuthorization } = UseContext();

    useEffect(() => {
        getAllDD();
    }, []);

    const handleUpload = (e) => {
        setUpdateDDImg(e.target.files[0]);
    };

    const DDImgInfo = (imgPath, ddId) => {
        return () => {
            setImgpreview(imgPath);
            setCurrentpid(ddId);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("ddImage", updateDDImg);

        try {
            const result = await axios.patch(
                `http://localhost:1000/api/admin/dropdown/updateDDImg/${currentpid}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: tokenAuthorization,
                    },
                }
            );

            if (result.status === 200) {
                toast.success(result.data.msg);
                // Assuming you want to reload data after successful update
                getAllDD();
            } else {
                toast.error(result.data.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error("Error occurred while submitting the form");
        }
    };

    // Show loading spinner until filter data is fetched
    if (isLoading || filterdata === null) {
        return <WebLoader />;
    }

    return (
        <>
        <br />
            <br/>
            <div className="container Table">
                <h1 className="adminPageHeading">Dropdown Menu Details</h1>
                <br />
                <div className="adminContant adminHeading">
                    <Link to={`/admin`} className="adminHomeBtn">
                        <button className="btn btn-warning ">
                            <FaHome /> Admin Home
                        </button>
                    </Link>{" "}
                    &nbsp; &nbsp;
                    <Link to={`/admin/dropdown/addDropdown`}>
                        <button className="btn btn-primary">
                            <MdAdd /> Add Dropdown Menu
                        </button>
                    </Link>
                </div>

                <br />

                <table className="responsive-table container">
                    <thead>
                        <tr>
                            <th>DD Image</th>
                            <th>DD Name</th>
                            <th>DD Category</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DD.map((currentDD, index) => {
                            const base64String = btoa(
                                String.fromCharCode(
                                    ...new Uint8Array(
                                        currentDD.ddImage.data.data
                                    )
                                )
                            );
                            return (
                                <tr key={index}>
                                    <td>
                                        <button
                                            type="button"
                                            className="Imgbutton"
                                            onClick={DDImgInfo(
                                                `data: image/png;base64, ${base64String}`,
                                                currentDD._id
                                            )}
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                        >
                                            <img
                                                src={`data: image/png;base64, ${base64String}`}
                                                alt="DD Image"
                                                width="50px"
                                            />
                                        </button>
                                    </td>
                                    <td>{currentDD.ddName}</td>
                                    <td>{currentDD.cName}</td>
                                    <td>
                                        <Link
                                            to={`/admin/dropdown/${currentDD._id}/editDropdown`}
                                        >
                                            <button className="btn btn-success">
                                                <MdEdit />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                deleteDropdown(currentDD._id)
                                            }
                                        >
                                            <RiDeleteBin6Fill />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <h1 className="modal-title fs-40" id="staticBackdropLabel">
                                Image Preview
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <img src={imgpreview} alt="DD Image" width="200px" />
                            <div className="mb-3">
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="formGroupExampleInput2"
                                        placeholder="Select Image"
                                        onChange={handleUpload}
                                        name="ddImage"
                                        accept="image/*"
                                        required
                                    />
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

