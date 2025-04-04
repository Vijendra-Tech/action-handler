export const approvalData = {
  initialState: "Rejected",
  states: {
    Unlocked: {
      components: [
        {
          name: "editSchedule",
          roles: ["editor", "admin"],
          props: {
            enabled: true,
          },
        },
        {
          name: "submitforApprovalButton",
          roles: ["editor", "admin"],   
          props: {
            enabled: true,
          },
        },
      ],
    },
    Rejected: {
      components: [
        {
          name: "tableCell",
          roles: ["editor", "admin"],
          cellId: "Alok-09/03/2015",
          props: {
            enabled: true,
            employeeDetails: {
              name: "Alok",
              timeSlot: "9:00 AM - 5:00 PM",
              comments: "Schedule needs approval"
            }
          }
        },
        {
          name: "tableCell",
          roles: ["editor", "admin"],
          cellId: "Ram-10/03/2015",
          props: {
            enabled: true,
            employeeDetails: {
              name: "Ram",
              timeSlot: "10:00 AM - 6:00 PM",
              comments: "Overtime request pending"
            }
          }
        },
        {
          name: "tableCell",
          roles: ["editor", "admin"],
          cellId: "Prem-11/03/2015",
          props: {
            enabled: true,
            employeeDetails: {
              name: "Prem",
              timeSlot: "8:00 AM - 4:00 PM",
              comments: "Early shift requested"
            }
          }
        }
      ],
    },
  },
};
