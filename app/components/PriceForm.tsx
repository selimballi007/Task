"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils";

const fields = ["Mdf", "Sunta", "Kulp", "Vida", "Cumba", "Baza", "Menteşe"];

export default function PriceForm() {
    const [prices, setPrices] = useState<Record<string, number>>({});
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [dolar, setDolar] = useState<number>(0);

    useEffect(() => {
        const stored = localStorage.getItem("prices");
        if (stored) {
            const parsed = JSON.parse(stored);
            const numericPrices: Record<string, number> = {};
            fields.forEach((f) => {
                numericPrices[f] = parseFloat(parsed[f] || "0");
            });
            setPrices(numericPrices);
            setDolar(parseFloat(parsed["DOLAR"] || "0"));
        }
    }, []);

    const handleQuantityChange = (field: string, value: string) => {
        setQuantities({
            ...quantities,
            [field]: parseFloat(value) || 0,
        });
    };

    const rowTotal = (field: string) => {
        const qty = quantities[field] || 0;
        const price = prices[field] || 0;
        return qty * price;
    };

    const grandTotal = fields.reduce((acc, f) => acc + rowTotal(f), 0);
    const grandTotalUSD = dolar > 0 ? grandTotal / dolar : 0;

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-xl font-bold mb-4 text-center">
                Fiyat Hesaplama
            </h1>

            <div className="w-full max-w-3xl overflow-x-auto">
                <table className="border-collapse border border-gray-300 w-full text-center text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Ürün</th>
                            <th className="border p-2">Miktar</th>
                            <th className="border p-2">Birim Fiyat</th>
                            <th className="border p-2">Satır Toplamı</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field) => (
                            <tr key={field}>
                                <td className="border p-2">{field}</td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        min={0}
                                        className="border rounded p-2 w-full sm:w-24 text-right"
                                        value={quantities[field] || ""}
                                        onChange={(e) => handleQuantityChange(field, e.target.value)}
                                        placeholder="0"
                                    />
                                </td>
                                <td className="border p-2">{prices[field] || 0}</td>
                                <td className="border p-2 font-medium">{rowTotal(field)}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-100 font-bold">
                            <td colSpan={3} className="border p-2 text-right">
                                Genel Toplam (Mtn)
                            </td>
                            <td className="border p-2">{grandTotal.toFixed(2)}</td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                            <td colSpan={3} className="border p-2 text-right">
                                Genel Toplam ($)
                            </td>
                            <td className="border p-2">{grandTotalUSD.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
