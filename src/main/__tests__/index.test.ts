import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as os from 'os';
import { ipcMain } from 'electron';

let findDefaultHandler: (e: any) => boolean;

describe('Main Process: find-default handler', () => {
	beforeEach(async () => {
		vi.clearAllMocks();
		vi.spyOn(fs, 'existsSync').mockReturnValue(false);

		vi.spyOn(ipcMain, 'handle').mockImplementation((ch, handler) => {
			if (ch === 'find-default') findDefaultHandler = handler;
			return ipcMain;
		});

		vi.spyOn(os, 'userInfo').mockReturnValue({ username: 'testuser' } as any);

		await import('../index');
	});

	it('returns true if chat.db exists', () => {
		vi.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
		expect(findDefaultHandler({} as any)).toBe(true);
		expect(fs.existsSync).toHaveBeenCalledWith(
			'/Users/testuser/Library/Messages/chat.db'
		);
	});

	it('returns false if chat.db does not exist', () => {
		vi.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
		expect(findDefaultHandler({} as any)).toBe(false);
		expect(fs.existsSync).toHaveBeenCalledWith(
			'/Users/testuser/Library/Messages/chat.db'
		);
	});
});
