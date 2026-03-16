import { useMutation } from "@tanstack/react-query";
import type { ServiceType } from "../backend.d";
import { useActor } from "./useActor";

export interface AppointmentInput {
  customerName: string;
  phoneNumber: string;
  email: string;
  service: ServiceType;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string | null;
}

export function useSubmitAppointment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: AppointmentInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitAppointment(
        data.customerName,
        data.phoneNumber,
        data.email,
        data.service,
        data.preferredDate,
        data.preferredTimeSlot,
        data.notes,
      );
    },
  });
}
