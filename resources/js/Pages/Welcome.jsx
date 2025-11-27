import React from "react";
import { Head } from "@inertiajs/react";
import { EscapeRoom } from "@/Components/scenes/EscapeRoom.jsx";

export default function Index() {
    return (
        <>
            <Head title="Escape Room" />
            <EscapeRoom />
        </>
    );
}
