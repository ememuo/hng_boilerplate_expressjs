import { Router } from "express";
import admin from "../controllers/AdminController";
import { authMiddleware, checkPermissions } from "../middleware";
import { UserRole } from "../enums/userRoles";

const adminRouter = Router();
const adminOrganisationController = new admin.AdminOrganisationController();

/**
 * @swagger
 * /organisation/{id}:
 *   patch:
 *     summary: Update an organisation
 *     description: Updates the details of an existing organisation.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The organisation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: The organisation was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phone:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Organisation not found
 */

adminRouter.patch(
  "/organisation/:id",
  authMiddleware,
  checkPermissions([UserRole.SUPER_ADMIN]),
  adminOrganisationController.updateOrg.bind(adminOrganisationController)
);

export { adminRouter };
