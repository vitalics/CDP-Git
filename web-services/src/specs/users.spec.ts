import { expect, assert } from 'chai';
import { suite, test } from 'mocha-typescript';

import { globalConstants } from 'utils/constants';
import { Inject } from 'utils/ioc';
import { UserService } from 'services';
import { HttpStatusCode, HttpHeaders, ContentTypes } from 'models/http';

@suite()
class VerifyUsersTest {

  @Inject() public readonly userService: UserService;

  @test('verify an http status code')
  public async checkUsersStatusCode() {
    const allUsersResponse = await this.userService.getAllUsers();

    expect(allUsersResponse.status).equals(HttpStatusCode.OK);
  }

  @test('verify an http response header')
  public async checkUsersHeader() {
    const allUsersResponse = await this.userService.getAllUsers();
    const headers: HttpHeaders = allUsersResponse.headers;

    expect(headers["content-type"]).equal(ContentTypes.JSON_UTF8);
  }

  @test(`verify an http response body contain array of ${globalConstants.usersArrayLength} users`)
  public async usersContainArrayOf10() {
    const allUsersResponse = await this.userService.getAllUsers();
    const users = allUsersResponse.data;

    expect(users.length).equals(globalConstants.usersArrayLength)
  }
}
