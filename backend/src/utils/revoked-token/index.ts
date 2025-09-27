export default abstract class RevokedTokenStore {
  private static _revokedTokens: RevokedToken[] = [];

  public static get = (token: RevokedToken): RevokedToken | undefined => {
    const foundRevokedToken = this._revokedTokens.find(
      (revokedToken) => revokedToken === token
    );

    return foundRevokedToken;
  };

  public static add = (token: RevokedToken): RevokedToken => {
    const foundRevokedToken = this._revokedTokens.find(
      (revokedToken) => revokedToken === token
    );
    if (foundRevokedToken) {
      return foundRevokedToken;
    }
    const newRevokedToken: RevokedToken = token;
    this._revokedTokens = [...this._revokedTokens, newRevokedToken];

    return newRevokedToken;
  };

  public static remove = (token: RevokedToken) => {
    const foundRevokedTokens = this._revokedTokens.findIndex(
      (revokedToken) => revokedToken === token,
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

export type RevokedToken = string;
