import {
  allEntries,
  notifications,
  proposals,
  type Entry,
} from "@/data/content";
export interface ContentRepository {
  list(): Entry[];
  find(slug: string): Entry | undefined;
}
export interface ParticipationRepository {
  listProposals(): typeof proposals;
}
export interface NotificationRepository {
  list(): typeof notifications;
}
export const contentRepository: ContentRepository = {
  list: () => allEntries,
  find: (slug) => allEntries.find((e) => e.slug === slug),
};
export const participationRepository: ParticipationRepository = {
  listProposals: () => proposals,
};
export const notificationRepository: NotificationRepository = {
  list: () => notifications,
};
