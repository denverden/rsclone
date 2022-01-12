/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';
import { Cat } from '../src/cat.module';

_chai.should();
_chai.expect;

@suite
class CatModuleTest {
  private SUT: Cat;

  private name: string;

  private color: string;

  before() {
    this.name = 'Tom';
    this.color = 'black';
    this.SUT = new Cat(this.name, this.color);
  }

  @test 'Cat is created'() {
    this.SUT.name.should.to.not.be.undefined.and.have
      .property('name')
      .equal('Tom');
  }
}
