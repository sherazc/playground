/**
 * Debug jest code in VS Code
 * https://jestjs.io/docs/troubleshooting
 *
 *
 * Add this launch.json
 * This will work on MAC
 *
 *
{

  "version": "0.2.0",
  "configurations": [
    {
      "runtimeExecutable": "/opt/homebrew/bin/node",
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/.bin/jest",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
 *
 *
 */
export {};
