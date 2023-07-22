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
import { CreateCustomerArgs } from "./CreateCustomerArgs";
import { UpdateCustomerArgs } from "./UpdateCustomerArgs";
import { DeleteCustomerArgs } from "./DeleteCustomerArgs";
import { CustomerCountArgs } from "./CustomerCountArgs";
import { CustomerFindManyArgs } from "./CustomerFindManyArgs";
import { CustomerFindUniqueArgs } from "./CustomerFindUniqueArgs";
import { Customer } from "./Customer";
import { Address } from "../../address/base/Address";
import { Order } from "../../order/base/Order";
import { CustomerService } from "../customer.service";
@graphql.Resolver(() => Customer)
export class CustomerResolverBase {
  constructor(protected readonly service: CustomerService) {}

  async _customersMeta(
    @graphql.Args() args: CustomerCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @graphql.Query(() => [Customer])
  async customers(
    @graphql.Args() args: CustomerFindManyArgs
  ): Promise<Customer[]> {
    return this.service.findMany(args);
  }

  @graphql.Query(() => Customer, { nullable: true })
  async customer(
    @graphql.Args() args: CustomerFindUniqueArgs
  ): Promise<Customer | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Customer)
  async createCustomer(
    @graphql.Args() args: CreateCustomerArgs
  ): Promise<Customer> {
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        address: args.data.address
          ? {
              connect: args.data.address,
            }
          : undefined,

        orders: args.data.orders
          ? {
              connect: args.data.orders,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Customer)
  async updateCustomer(
    @graphql.Args() args: UpdateCustomerArgs
  ): Promise<Customer | null> {
    try {
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          address: args.data.address
            ? {
                connect: args.data.address,
              }
            : undefined,

          orders: args.data.orders
            ? {
                connect: args.data.orders,
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

  @graphql.Mutation(() => Customer)
  async deleteCustomer(
    @graphql.Args() args: DeleteCustomerArgs
  ): Promise<Customer | null> {
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

  @graphql.ResolveField(() => Address, {
    nullable: true,
    name: "address",
  })
  async resolveFieldAddress(
    @graphql.Parent() parent: Customer
  ): Promise<Address | null> {
    const result = await this.service.getAddress(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @graphql.ResolveField(() => Order, {
    nullable: true,
    name: "orders",
  })
  async resolveFieldOrders(
    @graphql.Parent() parent: Customer
  ): Promise<Order | null> {
    const result = await this.service.getOrders(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}