import { Router } from 'express';
import {Customer} from '../models/customer';

const customers : Customer[] = [];
const router = Router();

type RequestBody = {
    id: number,
    name: string,
    birthDate: Date
}

router.get('/', (req, res) => {
    res.json(customers);
});
 
router.post('/', (req, res) => {
    const body = req.body as RequestBody;
    const newCustomer : Customer = {
        id: body.id,
        name: body.name,
        birthDate: body.birthDate
    };
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
})

export default router;