import { callFetchApprovals, submitForApproval } from "../action";
import store from "../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../types";

// API Response types
interface ApiResponse<T> {
  content: Array<{
    type: string;
    text: T;
  }>;
}

interface Comment {
  id: string;
  text: string;
  userId: string;
  timestamp: string;
  type: 'rejection' | 'response';
}

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

type ApiHandler<T> = (params: T) => Promise<ApiResponse<any>>;

export class FlowServiceResponseHandler {
  private apiHandlers: Map<string, ApiHandler<any>> = new Map();

  constructor() {
    this.registerDefaultHandlers();
  }

  private registerDefaultHandlers() {
    // Register add comment handler
    this.callFlowServiceApi(
      "add-comment",
      async ({ cellId, comment, userId }: { cellId: string; comment: string; userId: string }) => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              postId: 1,
              name: userId,
              email: `${userId}@example.com`,
              body: comment
            })
          });
          
          const data = await response.json();
          
          return {
            content: [{ type: "text", text: "Comment added successfully" }]
          };
        } catch (error) {
          console.error('Error adding comment:', error);
          throw new Error('Failed to add comment');
        }
      }
    );

    // Register fetch comments handler
    this.callFlowServiceApi(
      "fetch-comments",
      async ({ cellId }: { cellId: string }) => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
          const data = await response.json();
          
          const comments: Comment[] = data.map((item: any) => ({
            id: String(item.id),
            text: item.body,
            userId: item.name,
            timestamp: new Date().toISOString(),
            type: Math.random() > 0.5 ? 'rejection' : 'response'
          }));

          return {
            content: [{ 
              type: "text", 
              text: comments
            }]
          };
        } catch (error) {
          console.error('Error fetching comments:', error);
          throw new Error('Failed to fetch comments');
        }
      }
    );
  }

  callFlowServiceApi<T>(name: string, handler: ApiHandler<T>) {
    this.apiHandlers.set(name, handler);
  }

  async executeApi<T>(name: string, params: T): Promise<ApiResponse<any>> {
    const handler = this.apiHandlers.get(name);
    if (!handler) {
      throw new Error(`API handler '${name}' not found`);
    }
    return await handler(params);
  }

  async initiaApprovals() {
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = store.dispatch;
    try {
      await dispatch(callFetchApprovals());
    } catch (error) {
      console.error('Error fetching approvals:', error);
    }
  }

  async submitForApproval(payload: any): Promise<boolean> {
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = store.dispatch;
    try {
      await dispatch(submitForApproval(payload));
      return true;
    } catch (error) {
      console.error('Error submitting for approval:', error);
      return false;
    }
  }

  processData(approvalData: ApprovalDataType): ProcessedData {
    const state = approvalData.initialState;
    const components = approvalData.states[state]?.components || [];
    
    const editSchedule = components.find(c => c.name === "editSchedule") || null;
    const submitforApprovalButton = components.find(c => c.name === "submitforApprovalButton") || null;
    
    const tableCells = components
      .filter(c => c.name === "tableCell" && c.cellId)
      .reduce((acc, cell) => {
        if (cell.cellId) {
          acc[cell.cellId] = cell;
        }
        return acc;
      }, {} as { [key: string]: ComponentData });

    return {
      state,
      editSchedule,
      submitforApprovalButton,
      tableCells: Object.keys(tableCells).length > 0 ? tableCells : null
    };
  }
}
