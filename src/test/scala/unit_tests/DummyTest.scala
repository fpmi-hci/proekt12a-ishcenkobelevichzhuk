package unit_tests

import org.scalatest.funspec.AnyFunSpec

class DummyTest extends AnyFunSpec {
  describe("Test") {
    it(
      "dummy test"
    ) {
      print("Hello world")
      assert(true)
    }
  }
}
