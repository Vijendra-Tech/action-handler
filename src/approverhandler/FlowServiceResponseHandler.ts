import { callFetchApprovals, submitForApproval } from "../action";
import store from "../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../types";

interface ApprovalDataType {
  initialState: string;
  states: {
    [key: string]: {
      components: Array<{
        name: string;
        roles: string[];
        cellId?: string;
        props: {
          enabled: boolean;
          color?: string;
          icon?: string;
          [key: string]: any;
        };
      }>;
    };
  };
}

interface ComponentData {
  name: string;
  roles: string[];
  cellId?: string;
  props: {
    enabled: boolean;
    color?: string;
    icon?: string;
    [key: string]: any;
  };
}

interface ProcessedData {
  state: string;
  editSchedule: ComponentData | null;
  submitforApprovalButton: ComponentData | null;
  tableCells: { [key: string]: ComponentData } | null;
}

export class FlowServiceResponseHandler {
  constructor() {}

  static initiaApprovals() {
    const action = callFetchApprovals();
    (store.dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(action);
  }

  static async submitForApproval(payload: any) {
    const action = submitForApproval(payload);
    const success = await (store.dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(action);
    
    if (success) {
      // After successful submission, refresh the approvals
      this.initiaApprovals();
    }
    
    return success;
  }

  static processData(approvalData: ApprovalDataType): ProcessedData {
    const currentState = approvalData.initialState;
    const stateData = approvalData.states[currentState];

    const result: ProcessedData = {
      state: currentState,
      editSchedule: null,
      submitforApprovalButton: null,
      tableCells: null
    };

    if (stateData && stateData.components) {
      const cells: { [key: string]: ComponentData } = {};

      stateData.components.forEach((comp: ComponentData) => {
        if (comp.name === "editSchedule") {
          result.editSchedule = comp;
        } else if (comp.name === "submitforApprovalButton") {
          result.submitforApprovalButton = comp;
        } else if (comp.name === "tableCell" && comp.cellId) {
          cells[comp.cellId] = comp;
        }
      });

      if (Object.keys(cells).length > 0) {
        result.tableCells = cells;
      }
    }

    return result;
  }
}
