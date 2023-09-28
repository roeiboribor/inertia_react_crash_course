import { Fragment, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import { Dialog, Transition } from "@headlessui/react";

// UI COMPONENTS
import SuccessButton from "@/Components/ui/buttons/SuccessButton";

// CUSTOM COMPONENTS
import UserList from "./UserList";

const Index = ({ auth, users }) => {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

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
                                    <SuccessButton onClick={openModal}>
                                        <i className="bx bx-plus mr-2"></i> ADD
                                    </SuccessButton>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900">
                            <UserList users={users} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
