import Column from "@/Components/zustand/Column";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { usePage, Head } from "@inertiajs/react";

const Index = () => {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Todo List
                </h2>
            }
        >
            <Head title="Zustand" />
            <div className="py-12">
                <div className="flex justify-center items-start space-x-4">
                    <Column status="planned" />
                    <Column status="ongoing" />
                    <Column status="done" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
