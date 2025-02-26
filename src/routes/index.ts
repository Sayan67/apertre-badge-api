import { Router } from 'express';
import { badgeRoutes } from './badge.routes';

const router = Router();

router.use('/badge', badgeRoutes);

export const routes = router;