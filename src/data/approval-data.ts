export const approvalData = {
  initialState: "Unlocked",
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
  },
};
