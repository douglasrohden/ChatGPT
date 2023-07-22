/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateAddressArgs } from "./CreateAddressArgs";
import { UpdateAddressArgs } from "./UpdateAddressArgs";
import { DeleteAddressArgs } from "./DeleteAddressArgs";
import { AddressCountArgs } from "./AddressCountArgs";
import { AddressFindManyArgs } from "./AddressFindManyArgs";
import { AddressFindUniqueArgs } from "./AddressFindUniqueArgs";
import { Address } from "./Address";
import { Customer } from "../../customer/base/Customer";
import { AddressService } from "../address.service";
@graphql.Resolver(() => Address)
export class AddressResolverBase {
  constructor(protected readonly service: AddressService) {}

  async _addressesMeta(
    @graphql.Args() args: AddressCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @graphql.Query(() => [Address])
  async addresses(
    @graphql.Args() args: AddressFindManyArgs
  ): Promise<Address[]> {
    return this.service.findMany(args);
  }

  @graphql.Query(() => Address, { nullable: true })
  async address(
    @graphql.Args() args: AddressFindUniqueArgs
  ): Promise<Address | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Address)
  async createAddress(
    @graphql.Args() args: CreateAddressArgs
  ): Promise<Address> {
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        customers: args.data.customers
          ? {
              connect: args.data.customers,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Address)
  async updateAddress(
    @graphql.Args() args: UpdateAddressArgs
  ): Promise<Address | null> {
    try {
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          customers: args.data.customers
            ? {
                connect: args.data.customers,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Address)
  async deleteAddress(
    @graphql.Args() args: DeleteAddressArgs
  ): Promise<Address | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Customer, {
    nullable: true,
    name: "customers",
  })
  async resolveFieldCustomers(
    @graphql.Parent() parent: Address
  ): Promise<Customer | null> {
    const result = await this.service.getCustomers(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}