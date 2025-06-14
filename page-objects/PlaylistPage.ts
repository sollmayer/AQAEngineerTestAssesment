import { Page, Locator, expect } from "@playwright/test";
import { convertTimeToSeconds } from "../utils/helper.ts";

export class PlaylistPage {
	private readonly page: Page;
	readonly pageHeader: Locator;
	readonly searchInput: Locator;
	readonly availableTracklistContainer: Locator;
	readonly yourPlaylistContainer: Locator;
	readonly totalDurationText: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageHeader = page.getByText("Create your own unique playlist");
		this.searchInput = page.getByRole("textbox", { name: "Search" });
		this.availableTracklistContainer = page.locator("#tracklist");
		this.yourPlaylistContainer = page.locator("#playlist");
		this.totalDurationText = page.locator("#playlist-duration");
	}

	async goto() {
		await this.page.goto("/");
		await expect(this.pageHeader).toBeVisible();
	}

	async searchForTrack(trackName: string) {
		await this.searchInput.fill(trackName);
	}

	async getFilteredTrackNames() {
		await this.availableTracklistContainer.waitFor({ state: "attached" });

		const trackRowLocators = await this.availableTracklistContainer
			.locator("div.MuiGrid-container")
			.all();

		if (trackRowLocators.length === 0) return [];

		const trackNames = await Promise.all(
			trackRowLocators.map(async (row) => {
				const nameLocator = row.locator("div.MuiGrid-grid-xs-4 p");
				return (await nameLocator.textContent())?.trim() || "";
			})
		);

		return trackNames.filter((name) => name);
	}

	getAvailableTrackRow(trackName: string): Locator {
		return this.availableTracklistContainer.locator("div.MuiGrid-container", {
			hasText: trackName,
		});
	}

	getPlaylistTrackRow(trackName: string): Locator {
		return this.yourPlaylistContainer.locator("div.MuiGrid-container", { hasText: trackName });
	}

	async addTrackToPlaylist(trackName: string) {
		const trackRow = this.getAvailableTrackRow(trackName);
		await trackRow.getByRole("button", { name: "+" }).click();
	}

	async getTrackDurationFromRow(trackRow: Locator) {
		const durationLocator = trackRow.locator("p").filter({ hasText: /\d{2}:\d{2}/ });
		const duration = await durationLocator.textContent();
		return duration || "00:00";
	}

	async getTotalDurationInSecondsFromPlaylist() {
		const textContent = await this.totalDurationText.textContent();
		if (!textContent || textContent.includes("No tracks on playlist")) {
			return 0;
		}
		const matches = textContent.match(/\d+/);
		return matches ? parseInt(matches[0], 10) : 0;
	}
}
