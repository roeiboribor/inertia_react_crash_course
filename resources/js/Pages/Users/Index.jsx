import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useForm, Head } from "@inertiajs/react";

// UI COMPONENTS
import Button from "@/Components/ui/buttons/Button";

// CUSTOM COMPONENTS
import UserList from "./UserList";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

const Index = ({ auth, users }) => {
    let [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        console.log("Submit");
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
                                        className="btn-success"
                                        onClick={openModal}
                                    >
                                        <i className="bx bx-plus mr-2"></i> ADD
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900">
                            <UserList users={users} />
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS HERE */}
            <Modal show={isOpen} closeable={true} onClose={handleOnCloseModal}>
                <div className="p-6">
                    <div className="card-title">
                        <h3 className="text-xl font-bold">Add User</h3>
                    </div>
                    <div className="card-body py-8">
                        <form onSubmit={submit}>
                            <div className="">
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                    required
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                    maxLength="255"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="flex justify-end space-x-2">
                            <Button className="btn-success" onClick={submit}>
                                Save
                            </Button>
                            <Button
                                className="btn-secondary"
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
