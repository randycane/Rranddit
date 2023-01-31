import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSubFromIdThunk, editSubThunk } from "../../store/subranddit";
import "./UpdateSub.css";
