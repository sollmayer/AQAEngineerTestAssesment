import { test, expect } from "@playwright/test";
import { PlaylistPage } from "../page-objects/PlaylistPage";
import { convertTimeToSeconds } from "../utils/helper";

test.describe("Playlist App Functionality", () => {
	let playlistPage: PlaylistPage;

	test.beforeEach(async ({ page }) => {
		playlistPage = new PlaylistPage(page);
		await playlistPage.goto();
	});

	test("TC1: Search functionality should filter available tracks", async () => {
		const searchTerm = "in"; // This should match "Winter Winds", "Spring Dance", "Rainy Mood"
		await playlistPage.searchForTrack(searchTerm);

		const filteredTracks = await playlistPage.getFilteredTrackNames();

		// expect(visibleTracks).toContain("Winter Winds");
		// expect(visibleTracks).toContain("Spring Dance");
		// expect(visibleTracks).toContain("Rainy Mood");

		expect(filteredTracks.length).toBe(3);
		expect(filteredTracks).not.toContain("Summer Breeze");
		expect(filteredTracks).not.toContain("Autumn Leaves");
		
		// Loop through the results and verify each one contains the search term
		for (const trackName of filteredTracks) {
			expect(trackName.toLowerCase()).toContain(searchTerm.toLowerCase());
		}
	});

	test('TC2: Add track using "+" button should move it to "Your Playlist"', async () => {
		const trackToAdd = "Autumn Leaves";

		//Verify the track is not yet in the playlist
		await expect(playlistPage.getPlaylistTrackRow(trackToAdd)).not.toBeVisible();
		await playlistPage.addTrackToPlaylist(trackToAdd);

		const addedTrack = playlistPage.getPlaylistTrackRow(trackToAdd);
		await expect(addedTrack).toBeVisible();
	});

	test("TC3: Verify total duration of the playlist is calculated correctly in seconds", async () => {
		const track1 = "Summer Breeze";
		const track2 = "Autumn Leaves";

		await playlistPage.addTrackToPlaylist(track1);
		await playlistPage.addTrackToPlaylist(track2);

		// Getting the duration of each track from the UI
		const track1Row = playlistPage.getAvailableTrackRow(track1);
		const track2Row = playlistPage.getAvailableTrackRow(track2);

		const duration1Str = await playlistPage.getTrackDurationFromRow(track1Row);
		const duration2Str = await playlistPage.getTrackDurationFromRow(track2Row);

		const expectedTotalSeconds =
			convertTimeToSeconds(duration1Str) + convertTimeToSeconds(duration2Str);

		// Getting the displayed total duration from the UI
		const actualTotalSeconds = await playlistPage.getTotalDurationInSecondsFromPlaylist();

		expect(actualTotalSeconds).toBe(expectedTotalSeconds);
		expect(actualTotalSeconds).toBe(395);
	});
});
