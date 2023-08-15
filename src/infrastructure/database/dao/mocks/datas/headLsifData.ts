import * as fs from "fs";
import * as path from "path"

const filePath = path.resolve(__dirname, './jsonrpc.lsif')
const data = fetchData(filePath, 100); 

function fetchData(filePath, numberOfRows) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File ${filePath} does not exist`);
    }
    const lsifFile = fs.readFileSync(filePath, 'utf-8');
    const lines = lsifFile.split('\n');
    let extractedLines = [];
    for (let i = 0; i < numberOfRows && i < lines.length; i++) {
        let line = lines[i];
        if (line) {
            extractedLines.push(JSON.parse(line));        
        }
    }
    return extractedLines
}

if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest;
    
    describe('fetchData function for lsif file', () => {
        // 正常
        it('ソースコードをそのまま実行', () => {
            const data = fetchData(filePath, 100); 
            console.log(data)
        });

        it('ファイルが存在しない場合', () => {
            expect(() => fetchData('./nothing.lsif', 1)).toThrow();
        });
       
        it('ファイルが存在するが空の場合', () => {
            const tempFilePath = './temp_test.lsif';
            try {
                fs.writeFileSync(tempFilePath, ''); // 空の一時ファイルを作成
                const result = fetchData(tempFilePath, 5);
                expect(result).toEqual([]);
            } finally {
                if (fs.existsSync(tempFilePath)) {
                    fs.unlinkSync(tempFilePath); // 一時ファイルを削除
                }
            }
        });
        // // 4. 要求した行数がファイルの行数より多い場合
        // it('reads all lines if numberOfRows is greater than file lines', () => {
        //     fs.writeFileSync('./test.lsif', '{"key": "value1"}\n{"key": "value2"}');
        //     const result = fetchData('./test.lsif', 5);
        //     expect(result).toEqual([{ key: "value1" }, { key: "value2" }]);
        // });

        // // 5. 無効なJSONデータの取り扱い
        // it('throws error for invalid JSON', () => {
        //     fs.writeFileSync('./invalid.lsif', 'invalidJSON\n');
        //     expect(() => fetchData('./invalid.lsif', 1)).toThrow();
        // });

        // // 6. numberOfRowsが0以下の場合
        // it('returns empty array if numberOfRows is less than or equal to 0', () => {
        //     fs.writeFileSync('./test.lsif', '{"key": "value1"}\n{"key": "value2"}');
        //     const result = fetchData('./test.lsif', 0);
        //     expect(result).toEqual([]);
        // });

        // // 8. 戻り値の形式の検証
        // it('returns data as an array of objects', () => {
        //     fs.writeFileSync('./test.lsif', '{"key": "value1"}\n{"key": "value2"}');
        //     const result = fetchData('./test.lsif', 2);
        //     expect(result).toEqual([{ key: "value1" }, { key: "value2" }]);
        //     result.forEach(item => {
        //         expect(typeof item).toBe("object");
        //     });
        // });

        // // 10. 行の最後に改行がない場合
        // it('reads last line even if there is no newline', () => {
        //     fs.writeFileSync('./test.lsif', '{"key": "value1"}');
        //     const result = fetchData('./test.lsif', 1);
        //     expect(result).toEqual([{ key: "value1" }]);
        // });

    })

}