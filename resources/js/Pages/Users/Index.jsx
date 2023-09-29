import { useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { usePage, useForm, Head } from "@inertiajs/react";

// UI COMPONENTS
import Button from "@/Components/ui/buttons/Button";

// CUSTOM COMPONENTS
import UserList from "./UserList";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

// HELPER
import { isEmpty } from "@/Utils/helpers/validation";
import Loader from "@/Components/ui/loaders/Loader";

const Index = ({ auth, users }) => {
    let [isOpen, setIsOpen] = useState(false);

    const { data, setData, submit, processing, progress, errors, reset } =
        useForm({
            id: null,
            name: "",
            email: "",
            password: import.meta.env.VITE_DEFAULT_PASSWORD,
        });

    const closeModal = () => {
        setIsOpen(false);
        reset();
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleEditModal = async (id) => {
        if (id) {
            // Get
            await axios
                .get(route("api.users.edit", id))
                .then(({ data }) => setModelData(data.data))
                .catch((error) => console.log(error));

            openModal();
        }
    };

    const handleDeleteModal = (id) => {
        console.log(id);
        console.log("Delete Modal");
    };

    const setModelData = (items) => {
        console.log(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submit("post", route("users.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                closeModal();
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="card-header px-6 pt-4 pb-4 border-b">
                            <div className="flex items-end justify-between">
                                <h4 className="text-lg font-bold">User List</h4>
                                <div>
                                    <Button
                                        type="button"
                                        className="btn-success"
                                        onClick={openModal}
                                    >
                                        <i
                                            x-cloak="true"
                                            className="bx bx-plus mr-2"
                                        ></i>{" "}
                                        ADD
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900">
                            <UserList
                                users={users}
                                handleEditModal={handleEditModal}
                                handleDeleteModal={handleDeleteModal}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS HERE */}
            <Modal show={isOpen} closeable={true} maxWidth="xl">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="card-title relative">
                        <h3 className="text-xl font-bold">Add User</h3>
                        <span
                            onClick={closeModal}
                            className="absolute top-0 right-0 cursor-pointer"
                        >
                            <i className="bx bx-x text-xl text-red-500 font-semibold"></i>
                        </span>
                    </div>
                    <div className="card-body py-8">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12">
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                    required
                                />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required={true}
                                    maxLength="255"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-12">
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    required
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required={true}
                                    maxLength="255"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="flex items-center justify-between">
                            <div>
                                <Loader isShow={processing} />
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    disabled={
                                        isEmpty(data.name) ||
                                        isEmpty(data.email) ||
                                        processing
                                    }
                                    type="submit"
                                    className="btn-success"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button>
                                <Button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
