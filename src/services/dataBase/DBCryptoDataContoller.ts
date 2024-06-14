import { CryptoData } from "../../types/cryptoData";
import { connectToDatabase } from "./dataBaseConfig";
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);


export const initializeDatabase = async () => {
    const db = await SQLite.openDatabase({ name: "cryptoData.db", location: "default" });

    await db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS CryptoData (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, volume REAL, variation REAL, timestamp TEXT)",
            [],
            () => {
                console.log("Tabela CryptoData criada com sucesso");
            },
            (error) => {
                console.error("Erro ao criar tabela CryptoData", error);
            }
        );
    });
};

export const insertCryptoData = async (data: CryptoData[]) => {
    const db = await SQLite.openDatabase({ name: "cryptoData.db", location: "default" });

    await db.transaction((tx) => {
        data.forEach((item) => {
            tx.executeSql(
                "INSERT INTO CryptoData (name, price, volume, variation, timestamp) VALUES (?, ?, ?, ?, ?)",
                [item.name, item.price, item.volume, item.variation, item.timestamp],
                () => {
                    console.log("Dados inseridos com sucesso");
                },
                (error) => {
                    console.error("Erro ao inserir dados", error);
                }
            );
        });
    });
};

export const fetchCryptoData = async (callback: (data: CryptoData[]) => void) => {
    const db = await SQLite.openDatabase({ name: "cryptoData.db", location: "default" });

    await db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM CryptoData",
            [],
            (_, { rows }) => {
                const data = rows.raw() as CryptoData[];
                callback(data);
            },
            (error) => {
                console.error("Erro ao buscar dados", error);
            }
        );
    });
};

export const deleteOldCryptoData = async (timestamp: string) => {
    const db = await SQLite.openDatabase({ name: "cryptoData.db", location: "default" });

    await db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM CryptoData WHERE timestamp < ?",
            [timestamp],
            () => {
                console.log("Dados antigos deletados com sucesso");
            },
            (error) => {
                console.error("Erro ao deletar dados antigos", error);
            }
        );
    });
};