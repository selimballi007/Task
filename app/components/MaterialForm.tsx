"use client";

import { useEffect, useState } from "react";

const fields = ["DOLAR", "Mdf", "Sunta", "Kulp", "Vida", "Cumba", "Baza", "Menteşe"];

export default function MaterialForm() {
    const [prices, setPrices] = useState<Record<string, string>>({});

    // Sayfa yüklendiğinde localStorage'dan değerleri çek
    useEffect(() => {
        const stored = localStorage.getItem("prices");
        if (stored) {
            setPrices(JSON.parse(stored));
        }
    }, []);

    // Fiyat değiştiğinde state ve localStorage güncelle
    const handleChange = (name: string, value: string) => {
        const updated = { ...prices, [name]: value };
        setPrices(updated);
        localStorage.setItem("prices", JSON.stringify(updated));
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Fiyat Formu</h1>

            <form className="grid gap-4 w-full max-w-md">
                {fields.map((field) => (
                    <div key={field} className="flex flex-col">
                        <label className="font-medium mb-1">{field}</label>
                        <input
                            type="number"
                            min={0}
                            value={prices[field] || ""}
                            onChange={(e) => handleChange(field, e.target.value)}
                            className="border p-2 rounded"
                            placeholder={`${field} fiyatı gir`}
                        />
                    </div>
                ))}
            </form>
        </div>
    );
}
