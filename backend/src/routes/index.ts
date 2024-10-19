import { Router } from "express";
import user from "./user";
import listaTarefa from "./listaTarefa";
import SubSubTarefa from "./SubSubTarefa";
import SubTarefa from "./SubTarefa";

const router = Router();

router.use("/user", user);
router.use("/", listaTarefa);
router.use("/", SubTarefa);
router.use("/", SubSubTarefa);

export default router;