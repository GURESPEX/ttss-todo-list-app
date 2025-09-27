export default abstract class RevokedTokenStore {
  private static _revokedTokens: RevokedToken[] = [];

  public static get = (
    token: RevokedToken["value"]
  ): RevokedToken | undefined => {
    const foundRevokedToken = this._revokedTokens.find(
      (revokedToken) => revokedToken.value === token
    );
    return foundRevokedToken;
  };

  public static add = (
    token: RevokedToken["value"],
    expired?: RevokedToken["expired"]
  ): RevokedToken => {
    const foundRevokedToken = this._revokedTokens.find(
      (revokedToken) => revokedToken.value === token
    );
    if (foundRevokedToken) {
      return foundRevokedToken;
    }
    const newRevokedToken: RevokedToken = { value: token, expired };
    this._revokedTokens = [...this._revokedTokens, newRevokedToken];
    return newRevokedToken;
  };

  public static remove = (token: RevokedToken["value"]) => {
    const foundRevokedTokens = this._revokedTokens.findIndex(
      (revokedToken) => revokedToken.value === token,
      []
    );
    const removedRevokedToken = this._revokedTokens.splice(
      foundRevokedTokens,
      1
    )[0];
    return removedRevokedToken;
  };

  public static clear = () => {
    this._revokedTokens = [];
  };
}

export type RevokedToken = { value: string; expired?: number };
