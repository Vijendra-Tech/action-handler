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
            //other attribute
          },
        },
        {
          name: "submitforApprovalButton",
          roles: ["editor", "admin"],   
          props: {
            enabled: true,
            //other attribute
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
              timeSlot: "9:00am- 5pm"
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
              timeSlot: "10am-3pm",
              comments: "Rejected: Schedule conflict"
            }
          }
        }
      ]
    }
  },
};
