import { 
    enablePromise, 
    openDatabase, 
    DEBUG,
    SQLiteDatabase
  } from "react-native-sqlite-storage"; 
  
  DEBUG(true);
  enablePromise(true);
  
  let db: SQLiteDatabase | null = null; 

DEBUG(true);
enablePromise(true);

export const connectToDatabase = async (): Promise<SQLiteDatabase> => {
    if (!db) {
        db = await openDatabase(
            { name: "cryptoData.db", location: "default" },
            () => {
                console.log("Banco de dados aberto");
            },
            (error) => {
                console.error("Erro ao abrir o banco de dados:", error);
                throw Error("Não foi possível conectar ao banco de dados");
            }
        );
    }
    return db;
};
