// <DocumentNodeSchema>{
//     issuer: new AccountNodeSchema(),
//     tag:{
//         ['a']:{
//             document: {
//                '111111': 'asssaa'
//             }
//         }
//     }
// }
// cid/tag/invoices/document/11111/data
export class JWTHeader {
    typ: string;
    alg: string;
}
