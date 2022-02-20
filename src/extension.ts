// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Hats" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hats.hats', () => {
		const e = vscode.window.activeTextEditor
		if (!e) return

		// Insert hats below the selection.
		const s = e.selection
		const d = e.document
		const headTabs = d.lineAt(s.active).text.match(/^\t+/)?.[0] ?? ''
		const spaces = ' '.repeat(s.start.character - headTabs.length)
		const hats = '^'.repeat(s.end.character - s.start.character)
		const nextHead = d.lineAt(s.active.line + 1).range.start
		e.edit(eb => {
			const blank = headTabs + spaces
			eb.insert(nextHead, blank + hats + '\n' + blank + '\n')
		}).then(ok => {
			// Move cursor below the first hat.
			const belowFirstHat = d.lineAt(s.active.line + 2).range.end
			e.selection = new vscode.Selection(belowFirstHat, belowFirstHat)
		})
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
