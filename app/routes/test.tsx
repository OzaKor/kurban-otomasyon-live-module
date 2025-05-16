import type { Route } from "./+types/test";
import React from 'react';

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Test Sayfası" },
        { name: "description", content: "Test sayfa açıklaması" },
        { name: "keywords", content: "test, sayfa" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
    ]

}
function Test() {
    return (
        <div>
            Test
        </div>
    );
}

export default Test;